package de.ricardo.backend;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiaryService {

    private final DiaryRepository diaryRepository;

    DiaryService(DiaryRepository diaryRepository){
        this.diaryRepository = diaryRepository;
    }

    List<Diary> getAll() {
        return diaryRepository.findAll();
    }

    Diary save(Diary diary) {
        return diaryRepository.save(diary);
    }
}
