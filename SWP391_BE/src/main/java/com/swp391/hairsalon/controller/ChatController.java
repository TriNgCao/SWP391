//package com.swp391.hairsalon.controller;
//
//import com.swp391.hairsalon.dto.ChatMessage;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.stereotype.Controller;
//
//@Controller
//public class ChatController {
//
//    @MessageMapping("/sendMessage") // Map to the "/app/sendMessage" endpoint
//    @SendTo("/topic/messages") // Broadcast to all clients subscribed to "/topic/messages"
//    public ChatMessage sendMessage(ChatMessage message) {
//        return message; // Return the message so it will be sent to clients
//    }
//}
//
