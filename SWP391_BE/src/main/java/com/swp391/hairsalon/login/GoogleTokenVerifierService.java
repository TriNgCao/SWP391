package com.swp391.hairsalon.login;


import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import org.springframework.stereotype.Service;
import com.google.api.client.json.gson.GsonFactory;

import java.util.Collections;
@Service
public class GoogleTokenVerifierService {

    private final GoogleIdTokenVerifier verifier;

    // Khởi tạo GoogleIdTokenVerifier với client ID
    public GoogleTokenVerifierService() {
        this.verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList("500479775976-6h377dlqv30b55c9jfbuepburs6oo1ef.apps.googleusercontent.com")) // Thay YOUR_GOOGLE_CLIENT_ID bằng ID của bạn
                .build();
    }

    // Hàm dùng để xác thực Google ID token
    public String verifyToken(String idTokenString) throws Exception {
        GoogleIdToken idToken = verifier.verify(idTokenString);
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();

            // Xác thực thành công, lấy email từ payload
            return payload.getEmail();  // Hoặc có thể lấy thêm thông tin khác từ payload
        } else {
            throw new Exception("Invalid Google ID token.");
        }
    }
}
