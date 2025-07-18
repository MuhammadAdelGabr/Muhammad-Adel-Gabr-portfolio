---
layout: default
title: Projects
---

## My Projects

Here are some of the key projects I've worked on.

<div class="projects-grid">
{% for project in site.projects reversed %}
  <div class="project-card">
    <h3>{{ project.title }}</h3>
    <p>{{ project.content | markdownify | strip_html | truncatewords: 50 }}</p>
    <div>
      {% for tag in project.tags %}
        <span class="tag">{{ tag }}</span>
      {% endfor %}
    </div>
    <a href="{{ project.url | relative_url }}">Read More</a>
  </div>
{% endfor %}
</div>