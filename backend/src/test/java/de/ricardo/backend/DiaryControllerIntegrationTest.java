package de.ricardo.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class DiaryControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DiaryRepository diaryRepository;

    @DirtiesContext
    @Test
    void getAll() throws Exception {
        diaryRepository.save(new Diary("1", "test", DiaryStatus.LESS_THAN_SIX_THOUSAND_STEPS, null));
        mockMvc.perform(MockMvcRequestBuilders.get("/api/diary"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [{
                            "id": "1",
                            "description": "test",
                            "status": "LESS_THAN_SIX_THOUSAND_STEPS",
                            "imageUrl": null
                        }]
                        """));
    }

    @DirtiesContext
    @Test
    void postDiary() throws Exception {
        MockMultipartFile imageFile = new MockMultipartFile("file", "image.jpg", "image/jpeg", "dummy image content".getBytes());

        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/diary")
                        .file(imageFile)
                        .param("data", """
                                {
                                    "description": "test",
                                    "status": "LESS_THAN_SIX_THOUSAND_STEPS"
                                }
                                """)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "description": "test",
                            "status": "LESS_THAN_SIX_THOUSAND_STEPS"
                        }
                        """));
    }

    @DirtiesContext
    @Test
    void getDiaryById() throws Exception {
        diaryRepository.save(new Diary("1", "test", DiaryStatus.LESS_THAN_SIX_THOUSAND_STEPS, null));
        mockMvc.perform(MockMvcRequestBuilders.get("/api/diary/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "1",
                            "description": "test",
                            "status": "LESS_THAN_SIX_THOUSAND_STEPS",
                            "imageUrl": null
                        }
                        """));
    }

    @DirtiesContext
    @Test
    void updateDiary() throws Exception {
        diaryRepository.save(new Diary("1", "test", DiaryStatus.LESS_THAN_SIX_THOUSAND_STEPS, null));
        MockMultipartFile imageFile = new MockMultipartFile("file", "image.jpg", "image/jpeg", "updated image content".getBytes());

        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/diary/1")
                        .file(imageFile)
                        .param("data", """
                            {
                                "id": "1",
                                "description": "updated test",
                                "status": "LESS_THAN_SIX_THOUSAND_STEPS"
                            }
                            """)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                        .with(request -> {
                            request.setMethod("PUT");
                            return request;
                        })
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                        "id": "1",
                        "description": "updated test",
                        "status": "LESS_THAN_SIX_THOUSAND_STEPS"
                    }
                    """));
    }

    @DirtiesContext
    @Test
    void deleteDiary() throws Exception {
        diaryRepository.save(new Diary("1", "test", DiaryStatus.LESS_THAN_SIX_THOUSAND_STEPS, null));
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/diary/1"))
                .andExpect(status().isOk());
    }

    @DirtiesContext
    @Test
    void deleteDiaryNotFound() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/diary/1"))
                .andExpect(status().isNotFound());
    }

    @DirtiesContext
    @Test
    void postDiaryInvalidRequestBody() throws Exception {
        mockMvc.perform(
                        MockMvcRequestBuilders.multipart("/api/diary")
                                .param("data", """
                                        {
                                            "description": "",
                                            "status": ""
                                        }
                                        """)
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andExpect(status().isBadRequest());
    }
}
