//package com.swp391.hairsalon.service;
//
//import com.swp391.hairsalon.pojo.Account;
//import com.swp391.hairsalon.repository.IAccountRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//
//import java.sql.Date;
//import java.time.LocalDate;
//import java.util.Map;
//
//@Service
//public class CustomOAuth2UserService extends DefaultOAuth2UserService {
//
//    @Autowired
//    private IAccountRepository iAccountRepository;
////    public Account toAccount(Map<String, Object> map) {
////        if (map == null)
////            return null;
////        Account account = new Account();
////        account.setName(map.get("name").toString());
////        account.setEmail(map.get("email").toString());
////        account.setActive(true);
////        account.setRole(1);
////        account.setRegisterDate(Date.valueOf(LocalDate.now()));
////        return account;
////    }
//@Override
//public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//    // Gọi phương thức loadUser của DefaultOAuth2UserService để lấy thông tin người dùng
//    OAuth2User oAuth2User = super.loadUser(userRequest);
//
//    // Lấy thông tin từ OAuth2User
//    String name = oAuth2User.getAttribute("name");
//    String email = oAuth2User.getAttribute("email");
//
//    // Tạo đối tượng Account và lưu vào database
//    Account account = new Account();
//    account.setName(name);
//    account.setEmail(email);
//    account.setActive(true);
//    account.setRole(1);  // Role mặc định
//    account.setRegisterDate(Date.valueOf(LocalDate.now()));  // Ngày đăng ký
//
//    // Kiểm tra xem người dùng đã tồn tại trong database chưa, nếu chưa thì lưu
//    if (iAccountRepository.searchByEmail(email) == null) {
//        iAccountRepository.save(account);
//    }
//
//    // Trả về OAuth2User để Spring tiếp tục quy trình xác thực
//    return oAuth2User;
//}
////    public Account addAccount(Account account) {
////        Account a = iAccountRepository.searchByEmail(account.getEmail());
////        if (a == null)
////            return iAccountRepository.save(account);
////        else
////            return a;
////    }
//}
//
//
