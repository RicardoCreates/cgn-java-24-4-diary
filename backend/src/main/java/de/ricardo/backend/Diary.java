package de.ricardo.backend;

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


}
