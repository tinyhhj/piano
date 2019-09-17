package com.eunbi.PianoClass.repository;

import com.eunbi.PianoClass.domain.ClassTicket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClassTicketRepository extends JpaRepository<ClassTicket, String> {
    Page<ClassTicket> findByStudentId(String id, Pageable pageable);
    Optional<ClassTicket> findByIdAndStudentId(String id, String studentId);
}
