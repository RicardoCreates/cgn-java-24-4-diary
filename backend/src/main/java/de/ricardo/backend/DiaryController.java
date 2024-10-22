package de.ricardo.backend;


import de.ricardo.backend.service.CloudinaryService;
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
    private CloudinaryService cloudinaryService;

    public DiaryController(DiaryService diaryService, CloudinaryService cloudinaryService) {
        this.diaryService = diaryService;
        this.cloudinaryService = cloudinaryService;
    }

    @GetMapping
    List<Diary> getAll() {
        return diaryService.getAll();
    }

    @PostMapping(consumes = "multipart/form-data")
    public Diary saveWithFile(@RequestParam("description") String description,
                              @RequestParam("status") DiaryStatus status,
                              @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            Diary diary = new Diary(description, status, null);
            return diaryService.save(diary, file);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Image upload failed", e);
        }
    }

    @PostMapping(consumes = "application/json")
    public Diary saveWithoutFile(@RequestBody Diary diary) {
        try {
            return diaryService.save(diary, null);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Image upload failed", e);
        }
    }

    @GetMapping("/{id}")
    Diary getById(@PathVariable String id) {
        return diaryService.getById(id);
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable String id) {
        diaryService.delete(id);
    }

    @PutMapping(path = {"/{id}/update", "/{id}"}, consumes = "multipart/form-data")
    public Diary updateWithFile(@PathVariable String id,
                                @RequestParam("description") String description,
                                @RequestParam("status") DiaryStatus status,
                                @RequestParam(value = "file", required = false) MultipartFile file) {
        Diary existingDiary = diaryService.getById(id);

        try {
            Diary updatedDiary = new Diary(id, description, status, existingDiary.imageUrl());
            return diaryService.update(updatedDiary, file);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Image upload failed", e);
        }
    }

    @DeleteMapping("/{id}/image")
    public void deleteImage(@PathVariable String id) {
        diaryService.deleteImage(id);
    }


}
