package com.todoslave.feedme;

import com.todoslave.feedme.domain.entity.membership.Emotion;
import com.todoslave.feedme.domain.entity.membership.Member;
import com.todoslave.feedme.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.todoslave.feedme.repository")
@EnableMongoRepositories(basePackages = "com.todoslave.feedme.repository")
@EnableScheduling
public class FeedmeApplication implements CommandLineRunner {

	private final MemberService memberService;

	@Autowired
	public FeedmeApplication(MemberService memberService) {
		this.memberService = memberService;
	}

	public static void main(String[] args) {
		SpringApplication.run(FeedmeApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Member member = new Member();

		member.setEmail("asdf@gmail.com");
		member.setToken("ABC");
		member.setExp(0);
		member.setStatus(Emotion.SAD);
		member.setNickname("테스트1");
		member.setLatitude(12.4);
		member.setLongitude(12.4);

		int saveId = memberService.Join(member);
		System.out.println("Member saved with ID: " + saveId);
	}
}
