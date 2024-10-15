package com.swp391.hairsalon.service;

import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.repository.IAccountRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.UUID;

@Component
public class OAuthAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private IAccountRepository iAccountRepository;
    Logger logger = LoggerFactory.getLogger(OAuthAuthenticationSuccessHandler.class);

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        logger.info("onAuthenticationSuccess");

        DefaultOAuth2User user = (DefaultOAuth2User)authentication.getPrincipal();

        String email = user.getAttribute("email");
        String name = user.getAttribute("name");



        Account a2 = iAccountRepository.searchByEmail(email);
        if (a2 != null) {
            System.out.println(a2.getName());
            new DefaultRedirectStrategy().sendRedirect(request, response, "/auth/login");
        }

        Account a = new Account();
        a.setId(UUID.randomUUID().toString());
        a.setName(name);
        a.setEmail(email);
        a.setActive(true);
        a.setRole(1);
        a.setRegisterDate(Date.valueOf(LocalDate.now()));


        iAccountRepository.save(a);
        new DefaultRedirectStrategy().sendRedirect(request, response, "/auth/set-password");
    }
}
