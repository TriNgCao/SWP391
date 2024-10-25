package com.swp391.hairsalon.service.definitions;

import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

public interface IFileService {
    String uploadImage(String path, MultipartFile file) throws IOException;
    InputStream downloadImage(String path, String fileName) throws FileNotFoundException;

}
