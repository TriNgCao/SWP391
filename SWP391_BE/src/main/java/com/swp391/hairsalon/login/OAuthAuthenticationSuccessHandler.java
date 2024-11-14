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
import java.text.Normalizer;
import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;

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
            a.setName(removeVietnameseAccents(name));
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
        String redirectUrl = "http://localhost:3000/?token=" + email;

        this.setDefaultTargetUrl(redirectUrl);
        this.setAlwaysUseDefaultTargetUrl(true);
//        response.sendRedirect(redirectUrl);
        new DefaultRedirectStrategy().sendRedirect(request, response, this.getDefaultTargetUrl());
        this.setAlwaysUseDefaultTargetUrl(true);
        super.onAuthenticationSuccess(request, response, authentication);
    }
    public static String removeVietnameseAccents(String input) {
        // Chuẩn hóa chuỗi (normalize) để chuyển các ký tự có dấu sang dạng không dấu.
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        // Loại bỏ các ký tự dấu đi kèm.
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(normalized).replaceAll("").replaceAll("đ", "d").replaceAll("Đ", "D");
    }
}
