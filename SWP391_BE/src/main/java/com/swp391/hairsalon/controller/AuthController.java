package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    private IAccountService iAccountService;

    @RequestMapping("/")
    public String home() {
        return "Welcome to Hair Salon";
    }

    @GetMapping("/signingoogle")
    public Map<String, Object> currentUser(OAuth2AuthenticationToken token) {
        return token.getPrincipal().getAttributes();
    }


    public void toAccount(Map<String, Object> map) {
        if (map != null){
            if(iAccountService.isEmailExist(map.get("email").toString()) == false) {
                Account account = new Account();
                account.setName(map.get("name").toString());
                account.setEmail(map.get("email").toString());
                account.setActive(true);
                account.setRole(1);
                account.setRegisterDate(Date.valueOf(LocalDate.now()));
                iAccountService.addAccount(account);
            }
        }
    }




}
