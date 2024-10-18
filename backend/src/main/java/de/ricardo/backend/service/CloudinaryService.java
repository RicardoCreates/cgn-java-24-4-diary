package de.ricardo.backend.service;

import com.cloudinary.Cloudinary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadImage(MultipartFile image) throws IOException {
        File fileToUpload = File.createTempFile("file", null);
        image.transferTo(fileToUpload);
        Map response = cloudinary.uploader().upload(fileToUpload, Map.of());
        String imageUrl = response.get("url").toString();
        System.out.println("Image uploaded successfully: " + imageUrl);
        return imageUrl;
    }
}
