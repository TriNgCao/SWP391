package com.swp391.hairsalon.login;

import com.swp391.hairsalon.pojo.Account;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class MyUserDetails implements UserDetails {

    private Account account;

    public MyUserDetails(Account user) {
        account = user;
    }

    public int getRoleAsInt() {
        return account.getRole();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities()  {
        return Collections.singletonList(new SimpleGrantedAuthority(mapRoleToAuthority(account.getRole())));
    }

    private String mapRoleToAuthority(int roleId) {
        switch (roleId) {
            case 1:
                return "CUSTOMER";
            case 2:
                return "STYLIST";
            case 3:
                return "STAFF";
            case 4:
                return "MANAGER";
            case 5:
                    return "ADMIN";
            default:
                return "GUEST"; // Role mặc định
        }
    }

    @Override
    public String getPassword() {
        return account.getPassword();
    }

    @Override
    public String getUsername() {
        return account.getId();
    }
}
