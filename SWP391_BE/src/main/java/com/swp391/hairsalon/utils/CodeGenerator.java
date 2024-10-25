package com.swp391.hairsalon.utils;

import java.util.Random;

public class CodeGenerator {
    public static String generateCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000); // Tạo mã trong khoảng từ 100000 đến 999999
        return String.valueOf(code);
    }
}