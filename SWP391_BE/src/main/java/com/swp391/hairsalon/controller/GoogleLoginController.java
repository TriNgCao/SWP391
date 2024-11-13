//package com.swp391.hairsalon.controller;
//
//import org.springframework.boot.web.reactive.function.client.WebClientCustomizer;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
//import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class GoogleLoginController {
//
//    @GetMapping("/login/oauth2/code/google")
//    public ResponseEntity<String>  getGoogleUserInfo() {
//        OAuth2AuthenticationToken authenticationToken = (OAuth2AuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
//        String idToken = (String) authenticationToken.getPrincipal().getAttributes().get("id_token");
//
//        return ResponseEntity.ok(idToken);
//    }
//
//}
//
