import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Category } from '@/hooks/useTransactions';
import { Plus, Trash2, Tag, Pencil } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const CATEGORY_COLORS = [
  '#10B981', // green
  '#3B82F6', // blue
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#F59E0B', // amber
  '#EF4444', // red
  '#6366F1', // indigo
  '#14B8A6', // teal
];

interface CategoriesCardProps {
  categories: Category[];
  onAdd: (data: { name: string; type: 'income' | 'expense'; color?: string }) => void;
  onUpdate: (data: { id: string; name: string; color?: string }) => void;
  onDelete: (id: string) => void;
}

export function CategoriesCard({
  categories,
  onAdd,
  onUpdate,
  onDelete,
}: CategoriesCardProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryType, setNewCategoryType] = useState<'income' | 'expense'>('expense');
  const [selectedColor, setSelectedColor] = useState(CATEGORY_COLORS[0]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('');

  const handleAdd = () => {
    if (newCategoryName.trim()) {
      onAdd({ 
        name: newCategoryName.trim(), 
        type: newCategoryType, 
        color: selectedColor 
      });
      setNewCategoryName('');
      setSelectedColor(CATEGORY_COLORS[(categories.length + 1) % CATEGORY_COLORS.length]);
    }
  };

  const handleEdit = () => {
    if (editCategory && editName.trim()) {
      onUpdate({ id: editCategory.id, name: editName.trim(), color: editColor });
      setEditCategory(null);
      setEditName('');
      setEditColor('');
    }
  };

  const incomeCategories = categories.filter(c => c.type === 'income');
  const expenseCategories = categories.filter(c => c.type === 'expense');

  const CategoryItem = ({ category }: { category: Category }) => (
    <div
      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 group"
    >
      <div className="flex items-center gap-3">
        <span
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: category.color || '#6B7280' }}
        />
        <span className="font-medium">{category.name}</span>
        {category.is_default && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            Standaard
          </span>
        )}
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => {
            setEditCategory(category);
            setEditName(category.name);
            setEditColor(category.color || CATEGORY_COLORS[0]);
          }}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        {!category.is_default && (
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => setDeleteId(category.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Categorieën
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Beheer categorieën voor je inkomsten en uitgaven.
          </p>

          <div className="flex gap-2">
            <Input
              placeholder="Nieuwe categorie"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              className="flex-1"
            />
            <Select value={newCategoryType} onValueChange={(v: 'income' | 'expense') => setNewCategoryType(v)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Inkomst</SelectItem>
                <SelectItem value="expense">Uitgave</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-1 items-center">
              {CATEGORY_COLORS.slice(0, 4).map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-6 h-6 rounded-full transition-all ${
                    selectedColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
            <Button onClick={handleAdd} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Inkomsten categorieën</h4>
              {incomeCategories.length === 0 ? (
                <p className="text-center text-muted-foreground py-2 text-sm">
                  Geen inkomsten categorieën.
                </p>
              ) : (
                <div className="space-y-2">
                  {incomeCategories.map((category) => (
                    <CategoryItem key={category.id} category={category} />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Uitgaven categorieën</h4>
              {expenseCategories.length === 0 ? (
                <p className="text-center text-muted-foreground py-2 text-sm">
                  Geen uitgaven categorieën.
                </p>
              ) : (
                <div className="space-y-2">
                  {expenseCategories.map((category) => (
                    <CategoryItem key={category.id} category={category} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editCategory} onOpenChange={() => setEditCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Categorie bewerken</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editName">Naam</Label>
              <Input
                id="editName"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Kleur</Label>
              <div className="flex gap-2">
                {CATEGORY_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full transition-all ${
                      editColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setEditColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditCategory(null)}>
              Annuleren
            </Button>
            <Button onClick={handleEdit}>
              Opslaan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Categorie verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              Deze categorie wordt verwijderd. Transacties in deze categorie behouden hun gegevens maar verliezen de categoriekoppeling.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) {
                  onDelete(deleteId);
                  setDeleteId(null);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Verwijderen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
