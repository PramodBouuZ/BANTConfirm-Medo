import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getBlogs, getCategories, createBlog, updateBlog, deleteBlog } from '@/db/api';
import type { Blog, Category } from '@/types/types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { uploadFileToSupabase } from '@/lib/upload';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category_id: '',
    author: '',
    meta_title: '',
    meta_description: '',
    show_on_homepage: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [blogsData, categoriesData] = await Promise.all([
        getBlogs(),
        getCategories(),
      ]);
      setBlogs(blogsData);
      setCategories(categoriesData.filter((c) => c.type === 'blog'));
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (blog?: Blog) => {
    if (blog) {
      setEditingBlog(blog);
      setExistingImage(blog.featured_image || '');
      setImageFile(null);
      setFormData({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        category_id: blog.category_id || '',
        author: blog.author || '',
        meta_title: blog.meta_title || '',
        meta_description: blog.meta_description || '',
        show_on_homepage: blog.show_on_homepage,
      });
    } else {
      setEditingBlog(null);
      setExistingImage('');
      setImageFile(null);
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category_id: '',
        author: '',
        meta_title: '',
        meta_description: '',
        show_on_homepage: false,
      });
    }
    setDialogOpen(true);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a PNG or JPEG image.',
          variant: 'destructive',
        });
        return;
      }
      // Validate file size (1MB)
      if (file.size > 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Image must be less than 1MB.',
          variant: 'destructive',
        });
        return;
      }
      setImageFile(file);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      setUploading(true);

      // Upload image if new file selected
      let featuredImageUrl = existingImage;
      if (imageFile) {
        const uploadedUrl = await uploadFileToSupabase(imageFile, 'app-8n1wxpg9ygap_images');
        if (uploadedUrl) {
          featuredImageUrl = uploadedUrl;
        } else {
          toast({
            title: 'Upload failed',
            description: 'Failed to upload image. Please try again.',
            variant: 'destructive',
          });
          setUploading(false);
          return;
        }
      }

      const blogData = {
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        excerpt: formData.excerpt || null,
        content: formData.content,
        category_id: formData.category_id || null,
        author: formData.author || null,
        featured_image: featuredImageUrl || null,
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null,
        show_on_homepage: formData.show_on_homepage,
      };

      if (editingBlog) {
        await updateBlog(editingBlog.id, blogData);
        toast({
          title: 'Success',
          description: 'Blog updated successfully',
        });
      } else {
        await createBlog(blogData as any);
        toast({
          title: 'Success',
          description: 'Blog created successfully',
        });
      }

      setUploading(false);

      setDialogOpen(false);
      loadData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save blog',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      await deleteBlog(id);
      toast({
        title: 'Success',
        description: 'Blog deleted successfully',
      });
      loadData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete blog',
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Blog Manager</h1>
            <p className="text-muted-foreground">Create and manage blog posts</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Blog
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingBlog ? 'Edit Blog' : 'Add New Blog'}</DialogTitle>
                <DialogDescription>
                  {editingBlog ? 'Update blog post' : 'Create a new blog post'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="Auto-generated from title"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  {(existingImage || imageFile) && (
                    <div className="mb-2">
                      <img
                        src={imageFile ? URL.createObjectURL(imageFile) : existingImage}
                        alt="Featured image preview"
                        className="w-full h-48 object-cover border rounded-lg"
                      />
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleImageSelect}
                  />
                  <p className="text-xs text-muted-foreground">
                    Allowed formats: PNG, JPEG. Max size: 1MB.
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">SEO Settings</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="meta_title">Meta Title</Label>
                      <Input
                        id="meta_title"
                        value={formData.meta_title}
                        onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meta_description">Meta Description</Label>
                      <Textarea
                        id="meta_description"
                        value={formData.meta_description}
                        onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="homepage"
                    checked={formData.show_on_homepage}
                    onCheckedChange={(checked) => setFormData({ ...formData, show_on_homepage: checked })}
                  />
                  <Label htmlFor="homepage">Show on Homepage</Label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={uploading}>
                    {uploading ? 'Uploading...' : editingBlog ? 'Update Blog' : 'Create Blog'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full bg-muted" />
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No blogs yet</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Homepage</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{blog.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {blog.excerpt}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{blog.category?.name || '-'}</TableCell>
                      <TableCell>{blog.author || '-'}</TableCell>
                      <TableCell>
                        <Switch checked={blog.show_on_homepage} disabled />
                      </TableCell>
                      <TableCell>{new Date(blog.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(blog)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(blog.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
