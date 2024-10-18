package de.ricardo.backend;

import de.ricardo.backend.service.CloudinaryService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;


@Service
public class DiaryService {

    private final DiaryRepository diaryRepository;
    private final IdService idService;
    private final CloudinaryService cloudinaryService;

    DiaryService(DiaryRepository diaryRepository, IdService idService, CloudinaryService cloudinaryService) {
        this.diaryRepository = diaryRepository;
        this.idService = idService;
        this.cloudinaryService = cloudinaryService;
    }

    List<Diary> getAll() {
        return diaryRepository.findAll();
    }


    public Diary save(Diary diary, MultipartFile image) throws IOException {
        String id = idService.randomId();
        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            imageUrl = cloudinaryService.uploadImage(image);
        }
        Diary entryToSave = diary.withId(id).withImageUrl(imageUrl);
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
