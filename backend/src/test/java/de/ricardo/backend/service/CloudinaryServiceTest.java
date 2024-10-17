package de.ricardo.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CloudinaryServiceTest {

    @Mock
    private Cloudinary cloudinary;

    @Mock
    private Uploader uploader;

    @InjectMocks
    private CloudinaryService cloudinaryService;


    @Test
    void uploadImage_returnsUrl_onSuccess() throws IOException {
        String expectedUrl = "expected url";
        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(File.class), anyMap())).thenReturn(Map.of("url", expectedUrl));

        MockMultipartFile mockMultipartFile = new MockMultipartFile("image", "test.png", "image/png", "dummy content".getBytes());
        String actualUrl = cloudinaryService.uploadImage(mockMultipartFile);

        verify(uploader).upload(any(File.class), any());
        assertEquals(expectedUrl, actualUrl);
    }

}