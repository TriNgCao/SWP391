package com.swp391.hairsalon.login;

import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.repository.IAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private IAccountRepository iAccountRepository;

    @Override
    public MyUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println(email);
        Account user = iAccountRepository.searchByEmail(email);

        if (user == null)
            throw new UsernameNotFoundException(email + " not found");
        System.out.println(user.getPassword());
        MyUserDetails userDetails = new MyUserDetails(user);
        System.out.println(userDetails.getUsername());
        System.out.println(userDetails.getPassword());
//        MyUserDetails userDetails = (MyUserDetails) User.builder().username(user.getEmail()).password(passwordEncoder.encode(user.getPassword())).build();
        return userDetails;

    }
}
