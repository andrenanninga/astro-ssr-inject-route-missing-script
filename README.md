# Minimal example of `injectRoute()` with same `entrypoint` removing scripts in SSR

In this example project you can find two injected routes in `astro.config.mjs`:

```js
injectRoute({
	pattern: '/hello',
	entrypoint: './src/routes/template.astro'
})

injectRoute({
	pattern: '/blog/[...slug]',
	entrypoint: './src/routes/template.astro'
})
```

When running the project in dev mode `npm run dev` you can navigate to http://localhost:4321/hello or any path on `/blog/` (i.e. http://localhost:4321/blog/welcome). Here you will be greeted by an alert stating "my template".

In `./src/routes/template.astro` a `<script>` can be found where this alert is produced.

_However_ when building and running the project (`npm run build && npm run server`) we see a different result. Navigating to `/hello` produces an alert as before. Navigating to `/blog/welcome` however **does not** produce an alert. The `<script>` is missing from the source. 

In the source of each page you can see the difference between the two routes.

#### `view-source:http://localhost:4321/hello`
```html
<!DOCTYPE html><script type="module">alert("my template");
</script><h1>/hello</h1> 
```

#### `view-source:http://localhost:4321/blog/welcome`
```html
<!DOCTYPE html><h1>/blog/welcome</h1> 
```

Removing the first `injectRoute` call (with `pattern: '/hello'`) fixes the issue and does produce alerts on `/blog/` urls.
