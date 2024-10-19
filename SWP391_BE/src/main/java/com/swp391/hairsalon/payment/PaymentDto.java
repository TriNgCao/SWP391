package com.swp391.hairsalon.payment;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public abstract class PaymentDto {

    @Builder
    public static class VNPayResponse {
        public String code;
        public String message;
        public String paymentUrl;
    }
}
