package de.ricardo.backend;

import de.ricardo.backend.service.CloudinaryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class DiaryServiceTest {

    private DiaryRepository diaryRepository;
    private IdService idService;
    private CloudinaryService cloudinaryService;
    private DiaryService diaryService;

    @BeforeEach
    void setUp() {
        diaryRepository = mock(DiaryRepository.class);
        idService = mock(IdService.class);
        cloudinaryService = mock(CloudinaryService.class);
        diaryService = new DiaryService(diaryRepository, idService, cloudinaryService);
    }

    @Test
    void getAll() {
        List<Diary> diaries = diaryService.getAll();
        assertNotNull(diaries);
    }

    @Test
    void save() throws IOException {
        Diary expectedDiary = new Diary("1", "My first diary entry", DiaryStatus.SIX_THOUSAND_STEPS, "test-url");
        MultipartFile image = mock(MultipartFile.class);

        when(idService.randomId()).thenReturn("1");
        when(cloudinaryService.uploadImage(image)).thenReturn("test-url");
        when(diaryRepository.save(any(Diary.class))).thenReturn(expectedDiary);

        Diary result = diaryService.save(new Diary("My first diary entry", DiaryStatus.SIX_THOUSAND_STEPS, null), image);

        verify(idService, times(1)).randomId();
        verify(cloudinaryService, times(1)).uploadImage(image);
        verify(diaryRepository, times(1)).save(any(Diary.class));

        assertEquals(expectedDiary, result);
    }

    @Test
    void getById() {
        Diary expectedDiary = new Diary("1", "My first diary entry", DiaryStatus.SIX_THOUSAND_STEPS, "test");

        when(diaryRepository.findById("1")).thenReturn(java.util.Optional.of(expectedDiary));

        Diary result = diaryService.getById("1");

        verify(diaryRepository, times(1)).findById("1");

        assertEquals(expectedDiary, result);
    }

    @Test
    void update() throws IOException {
        Diary existingDiary = new Diary("1", "My first diary entry", DiaryStatus.SIX_THOUSAND_STEPS, "test-url");
        Diary updatedDiary = new Diary("1", "Updated diary entry", DiaryStatus.EIGHT_THOUSAND_STEPS, "updated-url");
        MultipartFile updatedImage = mock(MultipartFile.class);

        when(diaryRepository.findById("1")).thenReturn(java.util.Optional.of(existingDiary));
        when(cloudinaryService.uploadImage(updatedImage)).thenReturn("updated-url");
        when(diaryRepository.save(any(Diary.class))).thenReturn(updatedDiary);

        Diary updateRequest = new Diary("1", "Updated diary entry", DiaryStatus.EIGHT_THOUSAND_STEPS, null);
        Diary result = diaryService.update(updateRequest, updatedImage);

        verify(diaryRepository, times(1)).findById("1");
        verify(cloudinaryService, times(1)).uploadImage(updatedImage);
        verify(diaryRepository, times(1)).save(any(Diary.class));

        assertEquals(updatedDiary, result);
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
