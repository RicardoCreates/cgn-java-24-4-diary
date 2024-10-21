package de.ricardo.backend;

import java.util.Objects;

public record Diary(
        String id,
        String description,
        DiaryStatus status,
        String imageUrl
) {

    Diary(
            String description,
            DiaryStatus status,
            String imageUrl
    ){
        this(null, description, status, imageUrl);
    }


    public Diary withId(String id){
        return new Diary(id, description, status, imageUrl);
    }

    public Diary withImageUrl(String imageUrl) {
        return new Diary(id, description, status, imageUrl);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Diary diary = (Diary) o;
        return Objects.equals(id, diary.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}
