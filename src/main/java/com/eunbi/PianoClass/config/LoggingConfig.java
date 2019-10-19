package com.eunbi.PianoClass.config;

import com.eunbi.PianoClass.filter.CommonLoggingFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoggingConfig {

    @Bean
    public FilterRegistrationBean<CommonLoggingFilter> commonLoggingFilterFilterRegistrationBean() {
        FilterRegistrationBean<CommonLoggingFilter> loggingFilter = new FilterRegistrationBean<>(new CommonLoggingFilter());
        loggingFilter.setOrder(-10001);
        return loggingFilter;
    }

}
