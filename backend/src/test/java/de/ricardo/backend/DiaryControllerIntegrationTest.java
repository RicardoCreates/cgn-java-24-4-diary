package de.ricardo.backend;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.IOException;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class DiaryControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DiaryRepository diaryRepository;

    @MockBean
    Cloudinary cloudinary;

    Uploader uploader = mock(Uploader.class);

    @DirtiesContext
    @Test
    void getAll() throws Exception {

        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(), any())).thenReturn(Map.of("url", "test"));

        diaryRepository.save(new Diary("1", "test", DiaryStatus.LESS_THAN_SIX_THOUSAND_STEPS, "test"));
        mockMvc.perform(MockMvcRequestBuilders.get("/api/diary"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [{
                            "id": "1",
                            "description": "test",
                            "status": "LESS_THAN_SIX_THOUSAND_STEPS",
                            "imageUrl": "test"
                        }]
                        """));
    }

    @DirtiesContext
    @Test
    void postDiary() throws Exception {
        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(), any())).thenReturn(Map.of("url", "test"));

        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", MediaType.IMAGE_JPEG_VALUE, "test".getBytes());

        mockMvc.perform(
                        MockMvcRequestBuilders.multipart("/api/diary")
                                .file(file)
                                .param("description", "test")
                                .param("status", "LESS_THAN_SIX_THOUSAND_STEPS")
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                        "description": "test",
                        "status": "LESS_THAN_SIX_THOUSAND_STEPS",
                        "imageUrl": "test"
                    }
                    """));
    }

    @DirtiesContext
    @Test
    void postDiaryWithoutFile() throws Exception {
        String jsonContent = """
            {
                "description": "test",
                "status": "LESS_THAN_SIX_THOUSAND_STEPS",
                "imageUrl": null
            }
            """;

        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/diary")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonContent)
                )
                .andExpect(status().isOk())
                .andExpect(content().json(jsonContent));
    }

    @DirtiesContext
    @Test
    void getDiaryById() throws Exception {
        Diary diary = new Diary("1", "test", DiaryStatus.LESS_THAN_SIX_THOUSAND_STEPS, "test");
        diaryRepository.save(diary);
        assertTrue(diaryRepository.findById("1").isPresent());
        mockMvc.perform(MockMvcRequestBuilders.get("/api/diary/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                        "id": "1",
                        "description": "test",
                        "status": "LESS_THAN_SIX_THOUSAND_STEPS",
                        "imageUrl": "test"
                    }
                    """));
    }

    @DirtiesContext
    @Test
    void updateDiary() throws Exception {
        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(), any())).thenReturn(Map.of("url", "test"));

        diaryRepository.save(new Diary("1", "test", DiaryStatus.LESS_THAN_SIX_THOUSAND_STEPS, "test"));

        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", MediaType.IMAGE_JPEG_VALUE, "test".getBytes());

        mockMvc.perform(
                        MockMvcRequestBuilders.multipart("/api/diary/1/update")
                                .file(file)
                                .param("description", "updated description")
                                .param("status", "LESS_THAN_SIX_THOUSAND_STEPS")
                                .with(request -> {
                                    request.setMethod("PUT");
                                    return request;
                                })
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                        "id": "1",
                        "description": "updated description",
                        "status": "LESS_THAN_SIX_THOUSAND_STEPS",
                        "imageUrl": "test"
                    }
                    """));
    }

    @DirtiesContext
    @Test
    void deleteDiary() throws Exception {
        Diary diary = new Diary("1", "test", DiaryStatus.LESS_THAN_SIX_THOUSAND_STEPS, "test");
        diaryRepository.save(diary);
        assertTrue(diaryRepository.findById("1").isPresent());
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/diary/1"))
                .andExpect(status().isOk());
    }

    @DirtiesContext
    @Test
    void deleteDiaryNotFound() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/diary/1"))
                .andExpect(status().isNotFound());
    }


    @Test
    void postDiaryInvalidRequestBody() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", MediaType.IMAGE_JPEG_VALUE, "test".getBytes());

        mockMvc.perform(
                        MockMvcRequestBuilders.multipart("/api/diary")
                                .file(file)
                                .param("description", "")
                                .param("status", "")
                )
                .andExpect(status().isBadRequest());
    }

    @DirtiesContext
    @Test
    void postDiaryWithFileUploadFailure() throws Exception {
        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(), any())).thenThrow(new IOException("Upload failed"));

        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", MediaType.IMAGE_JPEG_VALUE, "test".getBytes());

        mockMvc.perform(
                        MockMvcRequestBuilders.multipart("/api/diary")
                                .file(file)
                                .param("description", "test")
                                .param("status", "LESS_THAN_SIX_THOUSAND_STEPS")
                )
                .andExpect(status().isInternalServerError());
    }

    @DirtiesContext
    @Test
    void postDiaryWithInvalidJson() throws Exception {
        String invalidJsonContent = """
            {
                "description": "test",
                "status": "INVALID_STATUS"
            }
            """;

        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/diary")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(invalidJsonContent)
                )
                .andExpect(status().isBadRequest());
    }

    @DirtiesContext
    @Test
    void updateDiaryWithoutFile() throws Exception {
        diaryRepository.save(new Diary("1", "test", DiaryStatus.LESS_THAN_SIX_THOUSAND_STEPS, "test"));

        mockMvc.perform(
                        MockMvcRequestBuilders.multipart("/api/diary/1/update")
                                .param("description", "updated description")
                                .param("status", "LESS_THAN_SIX_THOUSAND_STEPS")
                                .with(request -> {
                                    request.setMethod("PUT");
                                    return request;
                                })
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                {
                    "id": "1",
                    "description": "updated description",
                    "status": "LESS_THAN_SIX_THOUSAND_STEPS",
                    "imageUrl": "test"
                }
                """));
    }

    @DirtiesContext
    @Test
    void getDiaryByIdNotFound() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/diary/999"))
                .andExpect(status().isNotFound());
    }

    @DirtiesContext
    @Test
    void deleteImage() throws Exception {
        Diary diary = new Diary("1", "test", DiaryStatus.LESS_THAN_SIX_THOUSAND_STEPS, "test-url");
        diaryRepository.save(diary);
        assertTrue(diaryRepository.findById("1").isPresent());

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/diary/1/image"))
                .andExpect(status().isOk());

        Diary updatedDiary = diaryRepository.findById("1").orElseThrow();
        assertNull(updatedDiary.imageUrl());
    }

    @DirtiesContext
    @Test
    void deleteImageNotFound() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/diary/non-existent-id/image"))
                .andExpect(status().isNotFound());
    }

}


