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
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
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
//        this.setAlwaysUseDefaultTargetUrl(true);
//        this.setDefaultTargetUrl("http://localhost:3000");
        DefaultOAuth2User user = (DefaultOAuth2User) authentication.getPrincipal();

        String email = user.getAttribute("email");
        String name = user.getAttribute("name");


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
    }
}
