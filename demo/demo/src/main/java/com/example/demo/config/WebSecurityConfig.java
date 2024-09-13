package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.web.cors.CorsConfiguration.ALL;

@Configuration          //การตั้งค่า Configuration
@EnableWebSecurity      //การสนับสนุนความปลอดภัยเว็บของ Security
@EnableGlobalMethodSecurity(prePostEnabled = true)      //รักษาความปลอดภัยระดับ method
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {   //ขยายคลาส Spring Security เพื่อปรับแต่งการกําหนดค่าความปลอดภัย
    @Override
    protected void configure(HttpSecurity http) throws Exception {      //กําหนดค่าการตั้งค่าความปลอดภัย เช่น CORS และ CSRF
        http.cors().configurationSource(allPermitCors()).and().csrf().disable();        //เปิดใช้งาน CORS ด้วยการตั้งค่าแบบกําหนดเองและปิดใช้งานการป้องกัน CSRF
    }

    private CorsConfigurationSource allPermitCors() {   //สร้างการกําหนดค่า CORS ที่อนุญาตต้นทาง ส่วนหัว และ method ทั้งหมด
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedMethod(ALL);
        config.addAllowedHeader(ALL);
        config.addAllowedOrigin(ALL);
        config.setAllowCredentials(false);  //ป้องกันไม่ให้เซิร์ฟเวอร์ส่งข้อมูลเข้าสู่ระบบ
        config.setAllowedOrigins(List.of(ALL));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);        //ใช้การกําหนดค่า CORS กับเส้นทางทั้งหมดในแอปพลิเคชัน
        return source;
    }
}