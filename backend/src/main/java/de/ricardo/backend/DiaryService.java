package de.ricardo.backend;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class DiaryService {

    private final DiaryRepository diaryRepository;

    DiaryService(DiaryRepository diaryRepository){
        this.diaryRepository = diaryRepository;
    }

    List<Diary> getAll() {
        return diaryRepository.findAll();
    }

    public Diary save(Diary diary) {
        String id = UUID.randomUUID().toString();
        Diary todoToSave = diary.withId(id);
        return diaryRepository.save(todoToSave);
    }

    Diary getById(String id) {
        return diaryRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Diary entry not found")
        );
    }

    Diary update(Diary diary) {
        return diaryRepository.save(diary);
    }

    void delete(String id) {
        if (!diaryRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Diary entry not found");
        }
        diaryRepository.deleteById(id);
    }
}
