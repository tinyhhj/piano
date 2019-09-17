package com.eunbi.PianoClass;

import javafx.application.Application;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
public class PlainTest {



    Book book1;
    Book book2;
    List<Book> books;

    @Test
    public void test() {
        int currentX = 0;
        int currentY = 0;
        int spiralMaxLength = 1;
        int numSteps = 0;
        boolean isFirstStep = true;

        int spiralDirectionX = 0;
        int spiralDirectionY = 1;
        while (spiralMaxLength < 32)
        {
            System.out.println("currentX: {}, currentY: {}, spiralMaxLength: {}, numSteps: {}, isFirstStep: {}, spiralDirectionX: {}, spiralDirectionY: {}"
            .replaceFirst("\\{\\}",String.valueOf(currentX))
                            .replaceFirst("\\{\\}",String.valueOf(currentY))
                            .replaceFirst("\\{\\}",String.valueOf(spiralMaxLength))
                            .replaceFirst("\\{\\}",String.valueOf(numSteps))
                            .replaceFirst("\\{\\}",String.valueOf(isFirstStep))
                            .replaceFirst("\\{\\}",String.valueOf(spiralDirectionX))
                            .replaceFirst("\\{\\}",String.valueOf(spiralDirectionY))
            );
            currentX = currentX + spiralDirectionX;
            currentY = currentY + spiralDirectionY;
            numSteps++;

            // 다른 방향으로 전환한다
            if (numSteps == spiralMaxLength)
            {
                numSteps = 0;

                if (!isFirstStep)
                    spiralMaxLength++;

                isFirstStep = !isFirstStep;

                if (spiralDirectionX == 0)
                {
                    spiralDirectionX = spiralDirectionY;
                    spiralDirectionY = 0;
                }
                else
                {
                    spiralDirectionY = -spiralDirectionX;
                    spiralDirectionX = 0;
                }
            }
        }

    }

    @Test
    public void test2() {
        int currentX = 0;                   // 현재위치 x
        int currentY = 0;                   // 현재워치 y
        int dx = 0;                         // 방향 x
        int dy = 1;                         // 방향 y
        boolean maintainLength = true;      // 탐색길이 늘릴지 여부
        int step = 0;                       // 방향에서의 단계
        int maxLength = 32;                 // 탐색 임계점
        int length = 1;                     // 현재 방향에서 탐색길이

        while(length < maxLength ) {
            currentX = currentX + dx;
            currentY = currentY + dy;
            step++;

            if( step == length) {
                step = 0;
                if(!maintainLength)  {
                    length++;
                }

                maintainLength = !maintainLength;

                if( dx == 0) {
                    dx = dy;
                    dy = 0;
                } else {
                    dy = -dx;
                    dx = 0;
                }
            }
        }
    }
}