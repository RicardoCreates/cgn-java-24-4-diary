package de.ricardo.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
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
        Diary expectedDiary = new Diary("1", "My first diary entry", DiaryStatus.SIX_THOUSAND_STEPS);

        when(diaryRepository.save(any(Diary.class))).thenReturn(expectedDiary);

        Diary result = diaryService.save(new Diary("My first diary entry", DiaryStatus.SIX_THOUSAND_STEPS));

        verify(diaryRepository, times(1)).save(any(Diary.class));

        assertEquals(expectedDiary, result);
    }

    @Test
    void getById() {
        Diary expectedDiary = new Diary("1", "My first diary entry", DiaryStatus.SIX_THOUSAND_STEPS);

        when(diaryRepository.findById("1")).thenReturn(java.util.Optional.of(expectedDiary));

        Diary result = diaryService.getById("1");

        verify(diaryRepository, times(1)).findById("1");

        assertEquals(expectedDiary, result);
    }

    @Test
    void update() {
        Diary expectedDiary = new Diary("1", "My first diary entry", DiaryStatus.SIX_THOUSAND_STEPS);

        when(diaryRepository.save(any(Diary.class))).thenReturn(expectedDiary);

        diaryService.update(new Diary("1", "My first diary entry", DiaryStatus.SIX_THOUSAND_STEPS));

        verify(diaryRepository, times(1)).save(any(Diary.class));
    }

    @Test
    void delete() {
        String id = "1";
        when(diaryRepository.existsById(id)).thenReturn(true);

        diaryService.delete(id);

        verify(diaryRepository).deleteById(id);
    }

    @Test
    void delete_throwsException_whenDiaryNotFound() {
        String id = "non-existent-id";
        when(diaryRepository.existsById(id)).thenReturn(false);

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> diaryService.delete(id));
        assertEquals("404 NOT_FOUND \"Diary entry not found\"", exception.getMessage());
        verify(diaryRepository, never()).deleteById(id);
    }
}
