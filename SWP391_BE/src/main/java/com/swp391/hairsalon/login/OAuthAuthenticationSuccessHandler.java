package com.swp391.hairsalon.login;

import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.pojo.Customer;
import com.swp391.hairsalon.repository.IAccountRepository;
import com.swp391.hairsalon.repository.ICustomerRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;

@Component
public class OAuthAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Autowired
    private ICustomerRepository iCustomerRepository;

    @Autowired
    private IAccountRepository iAccountRepository;
    Logger logger = LoggerFactory.getLogger(OAuthAuthenticationSuccessHandler.class);

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        logger.info("onAuthenticationSuccess");

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User user = oauthToken.getPrincipal();
//        DefaultOAuth2User user = (DefaultOAuth2User) authentication.getPrincipal();
//        String idToken = user.getAttribute("id_token");
//        System.out.println(idToken);
        String email = user.getAttribute("email");
        System.out.println(email);
        String name = user.getAttribute("name");
        System.out.println(name);


        Account a2 = iAccountRepository.searchByEmail(email);
        if (a2 == null) {

            Account a = new Account();
            a.setId(UUID.randomUUID().toString());
            a.setName(name);
            a.setEmail(email);
            a.setActive(true);
            a.setRole(1);
            a.setRegisterDate(Date.valueOf(LocalDate.now()));


            iAccountRepository.save(a);
            Customer customer = new Customer();
            customer.setAccount(a); // Gán Account cho Customer
            customer.setLoyaltyPoints(0); // Khởi tạo điểm loyalty
            iCustomerRepository.save(customer); // Lưu Customer vào cơ sở dữ liệu

        }
        response.sendRedirect("http://localhost:3000");
    }
//    public String getIdToken(String authorizationCode) {
//        String tokenEndpoint = "https://oauth2.googleapis.com/token";
//        RestTemplate restTemplate = new RestTemplate();
//
//        // Tạo body cho yêu cầu
//        MultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
//        requestParams.add("code", authorizationCode);
//        requestParams.add("client_id", "YOUR_CLIENT_ID");
//        requestParams.add("client_secret", "YOUR_CLIENT_SECRET");
//        requestParams.add("redirect_uri", "YOUR_REDIRECT_URI");
//        requestParams.add("grant_type", "authorization_code");
//
//        // Gửi yêu cầu đến Google
//        ResponseEntity<Map> response = restTemplate.postForEntity(tokenEndpoint, requestParams, Map.class);
//
//        // Kiểm tra phản hồi và lấy id_token
//        if (response.getStatusCode() == HttpStatus.OK) {
//            Map<String, Object> responseBody = response.getBody();
//            return (String) responseBody.get("id_token");
//        } else {
//            throw new RuntimeException("Failed to obtain token: " + response.getBody());
//        }
//    }

}
