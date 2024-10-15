package de.ricardo.backend;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diary")
public class DiaryController {

    private final DiaryService diaryService;

    DiaryController(DiaryService diaryService){
        this.diaryService = diaryService;
    }

    @GetMapping
    List<Diary> getAll() {
        return diaryService.getAll();
    }

    @PostMapping
    Diary save(@RequestBody Diary diary) {
        return diaryService.save(diary);
    }
}
