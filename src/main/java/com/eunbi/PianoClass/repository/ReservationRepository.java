package com.eunbi.PianoClass.repository;

import com.eunbi.PianoClass.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, String> {
    List<Reservation> findAllByStudentId(String studentId);
    List<Reservation> findAllByReservationTimeBetween(LocalDateTime start, LocalDateTime end);
}
