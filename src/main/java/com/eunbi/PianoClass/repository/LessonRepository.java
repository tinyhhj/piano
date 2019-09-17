package com.eunbi.PianoClass.repository;

import com.eunbi.PianoClass.domain.Lesson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LessonRepository extends JpaRepository<Lesson, String> {
    Page<Lesson> findByTicketId(String ticketId, Pageable pageable);
    Optional<Lesson> findByIdAndTicketId(String id, String ticketId);
}
