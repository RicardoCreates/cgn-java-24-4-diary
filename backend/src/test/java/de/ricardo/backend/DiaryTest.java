package de.ricardo.backend;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DiaryTest {

    @Test
    void withId() {
        Diary diary = new Diary("Test description", DiaryStatus.SIX_THOUSAND_STEPS, "http://example.com/image.jpg");
        Diary updatedDiary = diary.withId("12345");

        assertEquals("12345", updatedDiary.id());
        assertEquals(diary.description(), updatedDiary.description());
        assertEquals(diary.status(), updatedDiary.status());
        assertEquals(diary.imageUrl(), updatedDiary.imageUrl());
    }

    @Test
    void withImageUrl() {
        Diary diary = new Diary("Test Description", DiaryStatus.SIX_THOUSAND_STEPS, "http://example.com/image.jpg");
        Diary updatedDiary = diary.withImageUrl("http://example.com/new_image.jpg");

        assertEquals(diary.id(), updatedDiary.id());
        assertEquals(diary.description(), updatedDiary.description());
        assertEquals(diary.status(), updatedDiary.status());
        assertEquals("http://example.com/new_image.jpg", updatedDiary.imageUrl());
    }

    @Test
    void testHashCode() {
        Diary diary1 = new Diary("Test description", DiaryStatus.SIX_THOUSAND_STEPS, "http://example.com/image.jpg");
        Diary diary2 = new Diary("Test description", DiaryStatus.SIX_THOUSAND_STEPS, "http://example.com/image.jpg");

        assertEquals(diary1.hashCode(), diary2.hashCode());
    }

    @Test
    void id() {
        Diary diary = new Diary("Test description", DiaryStatus.SIX_THOUSAND_STEPS, "http://example.com/image.jpg");
        assertNull(diary.id());
    }

    @Test
    void description() {
        Diary diary = new Diary("Test description", DiaryStatus.SIX_THOUSAND_STEPS, "http://example.com/image.jpg");
        assertEquals("Test description", diary.description());
    }

    @Test
    void status() {
        Diary diary = new Diary("Test description", DiaryStatus.SIX_THOUSAND_STEPS, "http://example.com/image.jpg");
        assertEquals(DiaryStatus.SIX_THOUSAND_STEPS, diary.status());
    }

    @Test
    void imageUrl() {
        Diary diary = new Diary("Test description", DiaryStatus.SIX_THOUSAND_STEPS, "http://example.com/image.jpg");
        assertEquals("http://example.com/image.jpg", diary.imageUrl());
    }
}