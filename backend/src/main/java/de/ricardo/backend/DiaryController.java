package de.ricardo.backend;


import de.ricardo.backend.service.CloudinaryService;
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
            String imageUrl = null;
            if (file != null && !file.isEmpty()) {
                imageUrl = cloudinaryService.uploadImage(file);
            }

            Diary diary = new Diary(description, status, imageUrl);

            return diaryService.save(diary);

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Image upload failed", e);
        }
    }

    @PostMapping(consumes = "application/json")
    public Diary saveWithoutFile(@RequestBody Diary diary) {
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
