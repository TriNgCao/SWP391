package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.login.GoogleAuthRequest;
import com.swp391.hairsalon.login.JwtRequest;
import com.swp391.hairsalon.login.JwtResponse;
import com.swp391.hairsalon.login.MyUserDetails;
import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.repository.IAccountRepository;
import com.swp391.hairsalon.security.JwtHelper;
import com.swp391.hairsalon.service.definitions.IAccountService;
import com.swp391.hairsalon.login.GoogleTokenVerifierService;
import com.swp391.hairsalon.login.MyUserDetailsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private GoogleTokenVerifierService googleTokenVerifierService;

    @Autowired
    private IAccountService iAccountService;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtHelper helper;

    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

        this.doAuthenticate(request.getEmail(), request.getPassword());

        if(!iAccountService.isActive(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }


            MyUserDetails myUserDetails = myUserDetailsService.loadUserByUsername(request.getEmail());

            String token = this.helper.generateToken(request.getEmail());

            JwtResponse response = JwtResponse.builder()
                    .token(token)
                    .userID(myUserDetails.getUsername())
                    .userRole(myUserDetails.getRoleAsInt())
                    .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<JwtResponse> register(@RequestBody Account newAccount) {
        if(iAccountService.isEmailExist(newAccount.getEmail())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        iAccountService.addAccount(newAccount);
        String token = this.helper.generateToken(newAccount.getEmail());
        JwtResponse response = JwtResponse.builder().token(token)
                .userID(newAccount.getEmail())
                .userRole(1)
                        .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PostMapping("/auth/google")
    public ResponseEntity<JwtResponse> authenticateGoogleUser(@RequestBody GoogleAuthRequest request) {
        String idToken = request.getIdToken();

        // Xác thực Google ID Token
        try {
            String email = googleTokenVerifierService.verifyToken(idToken);


                String token = this.helper.generateToken(email);

                JwtResponse response = JwtResponse.builder()
                        .token(token)
                        .userID(email)
                        .userRole(1)
                        .build();
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    
//    @PostMapping("/set-password")
//    public ResponseEntity<JwtResponse> setPassword(@RequestBody Map<String, String> request) {
//        String email = request.get("email");
//        String password = request.get("password");
//
////        // Cập nhật mật khẩu cho người dùng trong database
////        myUserDetailsService.updatePassword(email, password);
//
//
//        System.out.println(email + " " + password);
//        iAccountService.setPassword(email, password);
//        String token = this.helper.generateToken(email);
//
//        JwtResponse response = JwtResponse.builder()
//                .jwtToken(token)
//                .userName(email).build();
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }




    private void doAuthenticate(String email, String password) {

        System.out.println(email);
        System.out.println(password);
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }
    }


    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }

}



