package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.payment.PayResponse;
import com.swp391.hairsalon.payment.PaymentDto;
import com.swp391.hairsalon.payment.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor

public class PaymentController {
    private final PaymentService paymentService;

    @GetMapping("/vn-pay")
    public PayResponse<PaymentDto.VNPayResponse> pay(HttpServletRequest request) {
        return new PayResponse<>(HttpStatus.OK, "Success", paymentService.createVnPayPayment(request));
    }

    @GetMapping("/vn-pay-callback")
    public PayResponse<PaymentDto.VNPayResponse> payCallbackHandler(HttpServletResponse response, @RequestParam String vnp_ResponseCode) {

        if (vnp_ResponseCode.equals("00")) {
            return new PayResponse<>(HttpStatus.OK, "Success", PaymentDto.VNPayResponse.builder()
                    .code("00")
                    .message("success")
                    .paymentUrl("").build());
        } else {
            return new PayResponse<>(HttpStatus.BAD_REQUEST, "Failed", PaymentDto.VNPayResponse.builder()
                    .code("99")
                    .message("failed")
                    .paymentUrl("").build());
        }
    }
}
