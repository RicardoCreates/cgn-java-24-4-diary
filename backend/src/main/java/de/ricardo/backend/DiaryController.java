package de.ricardo.backend;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    @GetMapping("/{id}")
    Diary getById(@PathVariable String id) {
        return diaryService.getById(id);
    }

    @PutMapping(path = {"/{id}/update", "/{id}"})
    Diary update(@PathVariable String id, @RequestBody Diary diary) {
        if (!diary.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The id in the url does not match the request body's id");
        }
        return diaryService.update(diary);
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable String id) {
        diaryService.delete(id);
    }

}
