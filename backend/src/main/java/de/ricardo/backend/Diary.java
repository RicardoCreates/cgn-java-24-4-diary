package de.ricardo.backend;

public record Diary(
        String id,
        String description,
        DiaryStatus status
) {

    Diary(
            String description,
            DiaryStatus status
    ){
        this(null, description, status);
    }

    public Diary withId(String id){
        return new Diary(id, description, status);
    }


}
