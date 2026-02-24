"use client";

import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import {
  User,
  Camera,
  Loader2,
  Trash2,
  AlertTriangle,
  Check,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states - initialize from session if available
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Sync state with session when it loads
  React.useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
      setEmail(session.user.email ?? "");
    }
  }, [session]);

  // TRPC Mutations
  const uploadImageMutation = api.attachment.uploadImage.useMutation();
  const updateUserMutation = api.user.updateUser.useMutation({
    onSuccess: async () => {
      toast.success("Profile updated successfully");
      await updateSession();
      setIsUpdating(false);
    },
    onError: (err) => {
      toast.error("Failed to update profile: " + err.message);
      setIsUpdating(false);
    },
  });

  const deleteAccountMutation = api.user.deleteUser.useMutation({
    onSuccess: async () => {
      toast.success("Account deleted. Farewell.");
      await signOut({ callbackUrl: "/" });
    },
    onError: (err) => {
      toast.error("Failed to delete account: " + err.message);
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(",")[1];
          resolve(base64 ?? result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const uploadData = await uploadImageMutation.mutateAsync({
        fileData,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      });

      await updateUserMutation.mutateAsync({
        avatarUrl: uploadData.url,
      });

      toast.success("Avatar updated");
      // Force session update with the new image URL
      await updateSession({ image: uploadData.url });
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateUserMutation.mutateAsync({
        name,
        email,
      });
      await updateSession({ name, email });
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-12">
        <h1 className="font-playfair text-5xl font-bold tracking-tight">
          Account Settings
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Manage your presence and security settings.
        </p>
      </div>

      <div className="space-y-12">
        {/* Profile Image Section */}
        <section className="border-border/40 bg-muted/20 rounded-3xl border p-10 backdrop-blur-sm">
          <div className="flex flex-col items-center sm:flex-row sm:gap-10">
            <div className="group relative">
              <Avatar className="h-40 w-40 border-4 border-white/5 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <AvatarImage
                  src={session?.user?.image ?? ""}
                  key={session?.user?.image}
                />
                <AvatarFallback className="bg-zinc-900 font-serif text-4xl italic">
                  {session?.user?.name?.charAt(0) ?? "U"}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-primary text-primary-foreground absolute right-2 bottom-2 rounded-full p-3 shadow-lg transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
              >
                {isUploading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Camera size={18} />
                )}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="mt-6 flex-1 text-center sm:mt-0 sm:text-left">
              <h3 className="mb-2 text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">
                Profile Picture
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Click the camera icon to upload a new avatar. JPG, PNG or WEBP.
                Max 5MB.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-white/5 bg-white/5 hover:bg-white/10"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                Change Photo
              </Button>
            </div>
          </div>
        </section>

        {/* Personal Info Section */}
        <section className="border-border/40 bg-muted/20 rounded-3xl border p-8 backdrop-blur-sm">
          <h3 className="mb-8 flex items-center gap-2 text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">
            <User size={14} /> Personal Details
          </h3>
          <form onSubmit={handleUpdateProfile} className="space-y-8">
            {/* Form Fields */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">
                  Display Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="ring-offset-background focus-visible:ring-primary/50 h-12 border-white/5 bg-white/[0.03] px-4 transition-all focus-visible:ring-1"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">
                  Email Address
                </label>
                <Input
                  value={session?.user?.email ?? ""}
                  readOnly
                  placeholder="your@email.com"
                  className="ring-offset-background h-12 cursor-not-allowed border-white/5 bg-white/[0.03] px-4 opacity-50 transition-all focus-visible:ring-0"
                />
                <p className="text-[10px] tracking-tight text-zinc-500">
                  Email cannot be changed.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isUpdating || name === session?.user?.name}
                className="shadow-primary/10 w-full rounded-full px-8 shadow-xl transition-all hover:scale-105 sm:w-auto"
              >
                {isUpdating ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <Check size={16} className="mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </form>
        </section>

        {/* Account Controls Section */}
        <section className="rounded-3xl border border-red-500/10 bg-red-500/5 p-8 backdrop-blur-sm">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-[0.2em] text-red-500/60 uppercase">
            <AlertTriangle size={14} /> Danger Zone
          </h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="rounded-full px-8 shadow-xl shadow-red-500/10 transition-all hover:scale-105"
              >
                <Trash2 size={16} className="mr-2" />
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl border-white/10 bg-zinc-950">
              <DialogHeader>
                <DialogTitle className="font-playfair text-xl font-bold">
                  Are you absolutely sure?
                </DialogTitle>
                <DialogDescription className="text-zinc-400">
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers, including
                  all your journals and entries.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  className="rounded-full border-white/5"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="rounded-full shadow-lg shadow-red-500/20"
                  onClick={() => deleteAccountMutation.mutate()}
                >
                  Confirm Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>
      </div>
    </div>
  );
}
