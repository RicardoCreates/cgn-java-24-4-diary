package de.ricardo.backend;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Map;

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
        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/diary")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                            "description": "test",
                                            "status": "LESS_THAN_SIX_THOUSAND_STEPS",
                                            "imageUrl": "test"
                                        }
                                        """)
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
        diaryRepository.save(new Diary("1", DiaryStatus.LESS_THAN_SIX_THOUSAND_STEPS, "test" ));

        mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/diary/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                {
                                    "id": "1",
                                    "description": "test",
                                    "status": "LESS_THAN_SIX_THOUSAND_STEPS",
                                    "imageUrl": "test"
                                }
                                """)
                )
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


    @DirtiesContext
    @Test
    void postDiaryInvalidRequestBody() throws Exception {
        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/diary")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                            "description": "",
                                            "status": "",
                                            "imageUrl": ""
                                        }
                                        """)
                )
                .andExpect(status().isBadRequest());
    }
}


