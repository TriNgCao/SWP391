package com.swp391.hairsalon.config;

import com.swp391.hairsalon.security.JWTAuthenticationEntryPoint;
import com.swp391.hairsalon.security.JwtAuthenticationFilter;
import com.swp391.hairsalon.login.OAuthAuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityCofig {

    @Autowired
    private JWTAuthenticationEntryPoint point;

    @Autowired
    private JwtAuthenticationFilter filter;

    @Autowired
    private OAuthAuthenticationSuccessHandler handler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {




        http.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
//                .authorizeHttpRequests(
//                        auth -> {
////                            auth.requestMatchers("/test").authenticated();
//                            auth.requestMatchers("/auth/login", "/home").permitAll();
////                            auth.anyRequest().authenticated();
////                        })
                .oauth2Login(
                        oauth -> {
                            Customizer.withDefaults();
                            oauth.successHandler(handler);
                        }
                )
//


                .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }
}
