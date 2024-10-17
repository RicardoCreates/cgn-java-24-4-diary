package de.ricardo.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/diary")
public class DiaryController {

    private final DiaryService diaryService;

    @Autowired
    private CloudinaryService cloudinaryService;

    DiaryController(DiaryService diaryService){
        this.diaryService = diaryService;
    }

    @GetMapping
    List<Diary> getAll() {
        return diaryService.getAll();
    }

    @PostMapping
    Diary save(@RequestPart("data") Diary diary, @RequestPart("file") MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(image);
            diary = new Diary(diary.description(), diary.status(), imageUrl);
        }
        return diaryService.save(diary);
    }

    @GetMapping("/{id}")
    Diary getById(@PathVariable String id) {
        return diaryService.getById(id);
    }

    @PutMapping(path = {"/{id}/update", "/{id}"})
    Diary update(@PathVariable String id, @RequestPart("data") Diary diary, @RequestPart("file") MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(image);
            diary = new Diary(id, diary.description(), diary.status(), imageUrl);
        }
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
