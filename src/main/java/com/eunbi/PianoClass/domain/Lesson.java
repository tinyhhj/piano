package com.eunbi.PianoClass.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.web.bind.annotation.GetMapping;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Lesson extends AuditModel{
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id;
    private LocalDateTime LessonDate = LocalDateTime.now();
    private String memo;
    private boolean finish = false;

    @ManyToOne(fetch = FetchType.LAZY, optional =false)
    @JoinColumn(name = "ticket_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    ClassTicket ticket;

    public LocalDateTime getLessonDate() {
        return LessonDate;
    }

    public void setLessonDate(LocalDateTime lessonDate) {
        LessonDate = lessonDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public boolean isFinish() {
        return finish;
    }

    public void setFinish(boolean finish) {
        this.finish = finish;
    }

    public ClassTicket getTicket() {
        return ticket;
    }

    public void setTicket(ClassTicket ticket) {
        this.ticket = ticket;
    }
}
