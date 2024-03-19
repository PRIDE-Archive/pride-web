<template>
    <div>
        <NavBar />
        <div class="container" style="min-height: 100vh; padding-top: 32px; padding-bottom: 80px;">
            <main class="content">
                <h1 style="margin-bottom: 16px;color: black;">Relevant Documents</h1>
                <div style="width: 100%; text-align: left; font-size: 16px;line-height: 32px;" v-html="content"></div>
            </main>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/Nav'
export default {
    data() {
        return {
            md: "## title",
            content: "",
        };
    },
    components: {
        NavBar,
    },
    mounted() {
        try {
            this.content = localStorage.getItem("content");
            console.log(this.content);
        } catch (e) {
            console.error(e);
            this.$Message.error("data render failed");
        }
    },
    beforeDestroy() { },
    methods: {},
};
</script>

<style>
hr {
    margin: 18px 0;
}
.container {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}

.content {
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    overflow-y: auto;
}
</style>