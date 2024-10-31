package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.payment.PayResponse;
import com.swp391.hairsalon.payment.PaymentDto;
import com.swp391.hairsalon.payment.PaymentService;
import com.swp391.hairsalon.pojo.Customer;
import com.swp391.hairsalon.service.definitions.ICustomerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor

public class PaymentController {
    private final PaymentService paymentService;

    @Autowired
    private ICustomerService iCustomerService;

    @GetMapping("/vn-pay")
    public PayResponse<PaymentDto.VNPayResponse> pay(HttpServletRequest request) {
        return new PayResponse<>(HttpStatus.OK, "Success", paymentService.createVnPayPayment(request));
    }

    @GetMapping("/vn-pay-callback")
    public PayResponse<PaymentDto.VNPayResponse> payCallbackHandler(HttpServletResponse response, @RequestParam String vnp_ResponseCode) throws IOException {
        if (vnp_ResponseCode.equals("00")) {
            response.sendRedirect("http://localhost:3000/payment/success");
            return new PayResponse<>(HttpStatus.OK, "Success", PaymentDto.VNPayResponse.builder()
                    .code("00")
                    .message("success")
                    .paymentUrl("").build());
        } else {
            response.sendRedirect("http://localhost:3000/payment/fail");

            return new PayResponse<>(HttpStatus.BAD_REQUEST, "Failed", PaymentDto.VNPayResponse.builder()
                    .code("99")
                    .message("failed")
                    .paymentUrl("").build());
        }
    }

    @PutMapping("/point/{cusId}")
    public void usePoint(@PathVariable int cusId){
        Customer c = iCustomerService.getCustomerById(cusId);
        c.setLoyaltyPoints(0);
        iCustomerService.saveCustomer(c);
    }
}
