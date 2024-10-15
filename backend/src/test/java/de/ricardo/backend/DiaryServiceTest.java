package de.ricardo.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class DiaryServiceTest {

    private DiaryRepository diaryRepository;
    private DiaryService diaryService;

    @BeforeEach
    void setUp() {
        diaryRepository = mock(DiaryRepository.class);
        diaryService = new DiaryService(diaryRepository);
    }

    @Test
    void getAll() {
        List<Diary> diaries = diaryService.getAll();
        assertNotNull(diaries);
    }

    @Test
    void save() {
        Diary expectedDiary = new Diary("1", "My first diary entry", DiaryStatus.OPEN);

        when(diaryRepository.save(any(Diary.class))).thenReturn(expectedDiary);

        Diary result = diaryService.save(new Diary("My first diary entry", DiaryStatus.OPEN));

        verify(diaryRepository, times(1)).save(any(Diary.class));

        assertEquals(expectedDiary, result);
    }
}
