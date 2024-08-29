const { test, expect, beforeEach, describe } = require("@playwright/test");

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset');
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'nikey112',
        username: 'nikey112',
        password: '12345678'
      }
    });
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'ishaan112',
        username: 'ishaan112',
        password: '12345678'
      }
    });
    await page.goto('http://localhost:5173');
  });

  test.setTimeout(10000);

  test('Login form is shown', async ({ page }) => {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await expect(page.getByText('log in to application')).toBeVisible();
  });
  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const textbox = await page.getByRole('textbox').all()
      await textbox[0].fill('nikey112')
      await textbox[1].fill('12345678')
      await page.getByRole('button', { name: 'login' }).click();
      await expect(page.getByText('nikey112 Logged-in')).toBeVisible();
    });
    test('fails with wrong credentials', async ({ page }) => {
      const textbox = await page.getByRole('textbox').all()
      await textbox[0].fill('nikey112')
      await textbox[1].fill('wrong')
      await page.getByRole('button', { name: 'login' }).click();
      await expect(page.getByText('Invalid username or password')).toBeVisible()
      await expect(page.getByText('nikey112 Logged-in')).not.toBeVisible();  
    })
  
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      const textbox = await page.getByRole('textbox').all()
      await textbox[0].fill('nikey112')
      await textbox[1].fill('12345678')
      await page.getByRole('button', { name: 'login' }).click()
    })
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button',{name:'new Blog'}).click()
      const textbox2 = await page.getByRole('textbox').all()
      await textbox2[0].fill('test1 title')
      await textbox2[1].fill('test1 author')
      await textbox2[2].fill('test1 Url')
      await page.getByRole('button',{name:'create'}).click()
      await page.getByText('test1 title by test1 author').waitFor()
      await expect(page.getByText('test1 title by test1 author')).toBeVisible()
    })
    describe('add new note',()=>{
      beforeEach(async({page})=>{
        await page.getByRole('button',{name:'new Blog'}).click()
        const textbox2 = await page.getByRole('textbox').all()
          await textbox2[0].fill('test1 title')
          await textbox2[1].fill('test1 author')
          await textbox2[2].fill('test1 Url')
          await page.getByRole('button',{name:'create'}).click()
        })
        test('sure the blog can be liked', async({page}) => {
          await page.getByRole('button',{name:'view'}).click()
          await page.getByRole('button',{name:'like'}).click()
          await expect(page.getByText('likes 1')).toBeVisible()
        })
        test('the blog can be deleted by the user who added it', async({page}) => {
          await page.getByRole('button',{name:'view'}).click()
          page.once('dialog', async dialog => {
            expect(dialog.type()).toBe('confirm');
            await dialog.accept();
          });
          await page.getByRole('button', { name: 'remove' }).click();
          await expect(page.getByText('test1 title by test1 author')).not.toBeVisible();
        })
        test('can delete if only by added user', async({page}) => {
            await page.getByRole('button',{name:'LogOut'}).click()
            const textbox3 = await page.getByRole('textbox').all()
            await textbox3[0].fill('ishaan112')
            await textbox3[1].fill('12345678')
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByRole('button',{name:'view'}).click()
            
            await page.once('dialog', async dialog => {
              expect(dialog.type()).toBe('confirm');
              await dialog.accept();
            });
            await page.getByRole('button', { name: 'remove' }).click();
            await expect(page.getByText('invalid user cannot delete it')).toBeVisible();
        })
        
      })

  })

})
test('blogs are arranged according to likes', async ({ page }) => {
  test.setTimeout(30000);

  let textbox4 = await page.getByRole('textbox').all();
  await textbox4[0].fill('nikey112'); 
  await textbox4[1].fill('12345678');
  await page.getByRole('button', { name: 'login' }).click();

  // Helper function to create a blog
  const createBlog = async (title, author, url) => {
    await page.getByRole('button', { name: 'new Blog' }).click();
    const textbox = await page.getByRole('textbox').all();
    await textbox[0].fill(title);
    await textbox[1].fill(author);
    await textbox[2].fill(url);
    await page.getByRole('button', { name: 'create' }).click();
    await page.getByText(`${title} by ${author}`).waitFor(); // Ensure the blog is created
  };

  // Create two blogs
  const blog1 = {
    title: 'blog 1 title',
    author: 'test',
    url: '/blog-1'
  };
  const blog2 = {
    title: 'blog 2 title',
    author: 'test',
    url: '/blog-2'
  };
  await createBlog(blog1.title, blog1.author, blog1.url);
  await createBlog(blog2.title, blog2.author, blog2.url);

  // Like the first blog
  await page.locator(`text=${blog1.title} by ${blog1.author}`).locator('button:has-text("view")').click();
  await page.locator(`text=${blog1.title} by ${blog1.author}`).locator('button:has-text("like")').click();

  // Wait for the page to update
  await page.waitForTimeout(1000); // You might adjust or use another waiting strategy

  // Get the blog elements and verify order
  const blogDivs = await page.locator('div').filter({ hasText: 'view' }).all();
  const blog1Content = await blogDivs[0].innerText();
  const blog2Content = await blogDivs[1].innerText();

  expect(blog1Content).toContain(blog1.title);
  expect(blog2Content).toContain(blog2.title);
});

})
