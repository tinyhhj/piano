package com.eunbi.PianoClass.config;

import com.eunbi.PianoClass.service.StudentDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthenticationConfig {

    @Bean
    public StudentDetailsService userDetailsService() {
        return new StudentDetailsService();
    }
}
