package de.ricardo.backend;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class DiaryService {

    private final DiaryRepository diaryRepository;
    private final IdService idService;

    DiaryService(DiaryRepository diaryRepository, IdService idService){
        this.diaryRepository = diaryRepository;
        this.idService = idService;
    }

    List<Diary> getAll() {
        return diaryRepository.findAll();
    }

    public Diary save(Diary diary) {
        String id = idService.randomId();
        Diary entryToSave = diary.withId(id);
        return diaryRepository.save(entryToSave);
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
